import { Link } from 'react-router-dom';
import { AutoTextSize } from 'auto-text-size';
import { Rings } from 'react-loader-spinner';

import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaGoogle } from 'react-icons/lia';

import { useDeleteFlashCardMutation } from './flashCardsSlice';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';

const FlashCardExcerpt = ({ card }) => {
  const [deleteFlashCard, { isLoading, isSuccess }] =
    useDeleteFlashCardMutation();

  const deleteFlashCardHandler = async id => {
    try {
      await deleteFlashCard(id).unwrap();
    } catch (error) {
      console.log(`Failed to delete the card: `, error);
    }
  };

  return (
    <li
      key={card?.id}
      className='group relative overflow-hidden rounded-lg transition duration-200 hover:shadow-xl hover:shadow-blue-600'
    >
      {(isLoading || isSuccess) && (
        <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform'>
          <Rings
            visible={true}
            height='240'
            width='240'
            color='white'
            ariaLabel='rings-loading'
          />
        </div>
      )}
      <div className={`${(isLoading || isSuccess) && 'blur-sm'}`}>
        <img
          loading='lazy'
          className='relative aspect-square w-full rounded object-cover transition duration-200 group-hover:scale-110 '
          src={card?.picture}
          alt={card?.word}
        />
        {/* delete button */}
        <button
          type='button'
          onClick={() => {
            deleteFlashCardHandler(card?.id);
          }}
          className='absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md bg-white opacity-0 transition-opacity group-hover:opacity-100'
        >
          <AiOutlineDelete />
        </button>

        {/* edit button */}
        <Link
          className='absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-md bg-white opacity-0 transition-opacity group-hover:opacity-100'
          to={`edit/${card.id}`}
        >
          <AiOutlineEdit />
        </Link>
        <div className='absolute bottom-0 h-36 w-full bg-gray-500/50 px-4 py-3'>
          <div className='relative flex'>
            <div onClick={() => copyTextToClipboard(card?.word)}>
              <AutoTextSize
                className='cursor-pointer bg-gradient-to-r from-teal-400/50 to-blue-500/20 p-1 text-2xl font-semibold text-white'
                title='Click to copy.'
                mode='box'
                minFontSizePx='24'
                maxFontSizePx='24'
              >
                {card?.word}
              </AutoTextSize>
            </div>
            <a
              rel='noreferrer'
              target='_blank'
              href={`https://dictionary.cambridge.org/dictionary/english/${card.word}`}
              className='absolute right-0 top-8 flex cursor-pointer items-center justify-center rounded-md p-1 opacity-0 transition-opacity hover:bg-blue-300 group-hover:opacity-100'
            >
              <LuBookMarked size='20px' color='white' />
            </a>
            <a
              rel='noreferrer'
              target='_blank'
              href={`https://www.google.com.ua/search?q=${card.word}`}
              className='absolute right-0 top-1.5 flex cursor-pointer items-center justify-center rounded-md p-1 opacity-0 transition-opacity hover:bg-blue-300 group-hover:opacity-100'
            >
              <LiaGoogle size='20px' color='white' />
            </a>
          </div>
          <div>
            <AutoTextSize
              className='mt-1 leading-6 text-gray-200'
              mode='multiline'
              minFontSizePx='24'
              maxFontSizePx='24'
            >
              {card?.translation?.toLowerCase()}
            </AutoTextSize>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FlashCardExcerpt;
