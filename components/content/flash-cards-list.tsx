import { useMemo, useRef, useState } from 'react';

import FlashCardExcerpt from './flash-card-excerpt';

const FlashCardsList = () => {
  //   const [sort, setSort] = useState(false);
  //   const {
  //     data: flashCards,
  //     isLoading: flashCardsLoading,
  //     isSuccess,
  //     isError,
  //     error,
  //   } = useGetFlashCardsQuery();

  const componentRef = useRef();

  //   const sortHandler = value => {
  //     setSort(value);
  //   };

  //   const sortedFlashCards = useMemo(() => {
  //     const copy = flashCards?.slice();
  //     const sorted = sort
  //       ? copy.sort((a, b) => a.word.localeCompare(b.word))
  //       : flashCards;
  //     return sorted;
  //   }, [flashCards, sort]);

  let content;
  if (isSuccess) {
    content = sortedFlashCards?.map(card => (
      <FlashCardExcerpt key={card.id} card={card} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      {/* <FlashCardsListOptions
        flashCards={sortedFlashCards}
        sortHandler={sortHandler}
        flashCardsLoading={flashCardsLoading}
      /> */}
      <div ref={componentRef}>
        {sortedFlashCards?.length === 0 ? (
          <h1 className='bg-gradient-to-r from-blue-200 to-purple-800 bg-clip-text p-5 text-center text-4xl font-extrabold text-transparent'>
            You haven't added any words yet
          </h1>
        ) : (
          <ul
            className={`grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4`}
          >
            {content}
          </ul>
        )}
      </div>
      {/* <FlashCardsPrint
        flashCardsData={sortedFlashCards}
        componentRef={componentRef}
      /> */}
    </>
  );
};

export default FlashCardsList;
