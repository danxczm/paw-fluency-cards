import axios from 'axios';
const translateText = async (text, toLanguage = 'en') => {
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

    return response?.data[0]?.translations[0]?.text.toLowerCase();
  } catch (error) {
    console.error('translateText', error);
    return null;
  }
};

const getDetails = async text => {
  let detailedData = {
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
    const response = await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);

    detailedData = {
      phonetic: response?.data.find(item => item.phonetic !== undefined)?.phonetic ?? `/${text}/`,
      audio: response?.data[0].phonetics.find(item => item.audio !== '')?.audio ?? '',
      partOfSpeech: response?.data[0].meanings[0]?.partOfSpeech ?? '',
      definition: response?.data[0].meanings[0]?.definitions[0].definition ?? '',
    };

    return detailedData;
  } catch (error) {
    console.log('getDetails', error);
    return detailedData;
  }
};

const fetchUnsplashPhoto = async searchQuery => {
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

export const fetchMultipleData = async (searchQuery, translateTo) => {
  try {
    const translation = await translateText(searchQuery, translateTo);

    if (translation === searchQuery) {
      console.log(
        'There is something wrong  in your text, it may be a typo or native and target languages are the same! 🏳'
      );

      return null;
    }

    const getPictureInEng = await translateText(searchQuery);
    const unsplashPhoto = await fetchUnsplashPhoto(getPictureInEng);
    const { phonetic, audio, partOfSpeech, definition } = await getDetails(getPictureInEng);

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
  } catch (error) {
    console.error('fetchMultipleData', error);
  }
};
