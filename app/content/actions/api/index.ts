import axios, { AxiosResponse } from 'axios';

interface Phonetic {
  text: string;
  audio: string;
}

interface Definition {
  definition: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryResponse {
  phonetics: Phonetic[];
  meanings: Meaning[];
}

interface DetailedData {
  phonetic: string;
  audio: string;
  partOfSpeech: string;
  definition: string;
}

const translateText = async (text: string, toLanguage = 'en'): Promise<string | null> => {
  const translationOptions = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      'to[0]': toLanguage,
      'api-version': '3.0',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios(translationOptions);
    return response?.data[0]?.translations[0]?.text.toLowerCase() || null;
  } catch (error) {
    console.error('translateText', error);
    return null;
  }
};

const getDetails = async (text: string): Promise<DetailedData> => {
  const detailedData: DetailedData = {
    phonetic: '',
    audio: '',
    partOfSpeech: '',
    definition: '',
  };

  const validate = /\s/g.test(text);

  if (validate) {
    return detailedData;
  }

  try {
    const response: AxiosResponse<DictionaryResponse[]> = await axios.get<DictionaryResponse[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    );

    if (!response.data || response.data.length === 0) {
      throw new Error('No data found for the provided word');
    }

    const dictionaryEntry = response.data[0]; // Assuming there's only one entry for the word

    const phoneticData = dictionaryEntry.phonetics[0] || { text: `/${text}/`, audio: '' };
    const audioData = phoneticData.audio || '';
    const partOfSpeechData = dictionaryEntry.meanings[0]?.partOfSpeech || '';
    const definitionData = dictionaryEntry.meanings[0]?.definitions[0]?.definition || '';

    return {
      phonetic: phoneticData.text,
      audio: audioData,
      partOfSpeech: partOfSpeechData,
      definition: definitionData,
    };
  } catch (error) {
    console.log('Error fetching word details:', error);
    return detailedData;
  }
};

const fetchUnsplashPhoto = async (searchQuery: string): Promise<string> => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL}/search/photos?page=1&per_page=1&orientation=landscape&query=${searchQuery}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY_ID}`
    );
    return response?.data?.results[0]?.urls?.regular || 'https://i.ibb.co/2NVKDq2/1.png';
  } catch (error) {
    console.error('fetchUnsplashPhoto', error);
    return 'https://i.ibb.co/2NVKDq2/1.png';
  }
};

export const fetchMultipleData = async (
  searchQuery: string,
  translateTo: string
): Promise<any | null> => {
  try {
    const translation = await translateText(searchQuery, translateTo);

    if (translation === searchQuery) {
      console.warn(
        'There is something wrong in your text, it may be a typo or native and target languages are the same! 🏳'
      );

      return null;
    }

    const getPictureInEng = await translateText(searchQuery);
    let phonetic = '';
    let audio = '';
    let partOfSpeech = '';
    let definition = '';
    if (typeof getPictureInEng === 'string') {
      const unsplashPhoto = await fetchUnsplashPhoto(getPictureInEng);
      ({ phonetic, audio, partOfSpeech, definition } = await getDetails(getPictureInEng));

      const response = {
        word: searchQuery,
        translation,
        phonetic,
        audio,
        partOfSpeech,
        definition,
        picture: unsplashPhoto,
      };

      return response;
    }
  } catch (error) {
    console.error('fetchMultipleData', error);
    return null;
  }
};
