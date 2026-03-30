import { useEffect, useMemo, useState } from "react";
import BookFrame from "../../flipbook/BookFrame";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import Loading from "../../general/Loading";
import { fetchSpells } from "../../../../apiClient/spellsApi";
import GrimoireSpellGeneralDetailsPage from "./GrimoireSpellGeneralDetailsPage";
import GrimoireSpellExtraDetailsPage from "./GrimoireSpellExtraDetailsPage";

export default function GrimoireBook() {
  const [spells, setSpells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingSpells, setLoadingSpells] = useState(false);

  const pagesPerSpell = 2;

  useEffect(() => {
    async function loadSpells() {
      setLoadingSpells(true);

      try {
        const data = await fetchSpells();

        const sortedBySchool = [...data].sort((a, b) =>
          a.school.index.localeCompare(b.school.index)
        );

        setSpells(sortedBySchool);
      } catch (error) {
        console.error("Failed to load spells:", error);
      } finally {
        setLoadingSpells(false);
      }
    }

    loadSpells();
  }, []);

  function paginateSpells(spellsList, maxItemsPerPage = 10) {
    const allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousSpellSchool = "";

    for (const item of spellsList) {
      if (
        resetCounter >= maxItemsPerPage ||
        (previousSpellSchool && previousSpellSchool !== item.school.name)
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        resetCounter = 0;
      }

      currentPageItems.push({
        ...item,
        itemNbr,
        indexExtraContent: item.classes.map((c) => (
          <Icon
            key={c.index}
            title={`Class: ${c.name}`}
            imgSrc={`/images/classes/${c.index}.svg`}
            altText="class icon"
          />
        )),
      });

      itemNbr += pagesPerSpell;
      resetCounter++;
      previousSpellSchool = item.school.name;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const spellsIndexPages = useMemo(() => {
    return paginateSpells(spells, 10);
  }, [spells]);

  const shouldAddExtraPageAfterIndex = spellsIndexPages.length % 2 == 0;

const shouldAddExtraPageAtEnd = (spellsIndexPages.length +  (shouldAddExtraPageAfterIndex ? 1 : 0) + (spells.length * pagesPerSpell)) % 2 != 0;
  const flipToPageHandler = (itemNbr) => {
    const numberOfIndexPages = spellsIndexPages.length;

    const spellPage =
      itemNbr +
      numberOfIndexPages +
      3 +
      (shouldAddExtraPageAfterIndex ? 1 : 0);

    setFlipToPage(spellPage);
  };

  if (loadingSpells) {
    return <Loading />;
  }

  const spellStartOffset =
    spellsIndexPages.length + (shouldAddExtraPageAfterIndex ? 5 : 4);

  const bookPages = [];

  bookPages.push(
    <BookFrontCover
      key="front-cover"
      currentPage={currentPage}
      title="Grimoire"
    />
  );

  bookPages.push(
    <Page key="page-1" currentPage={currentPage} pageNumber={1}>
      <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8" />
    </Page>
  );

  bookPages.push(
    <Page key="page-2" currentPage={currentPage} pageNumber={2}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">
          Welcome to the Grimoire!
        </h1>
      </div>
    </Page>
  );

  bookPages.push(
    <Page key="page-3" currentPage={currentPage} pageNumber={3}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">Introduction</h1>
        <p className="text">
          This grimoire contains detailed knowledge of arcane spells and
          enchantments. Use the index to locate specific incantations and
          uncover their effects, uses, and hidden secrets.
        </p>
      </div>
    </Page>
  );

  spellsIndexPages.forEach((pageSpells, index) => {
    bookPages.push(
      <IndexPage
        key={`index-page-${index}`}
        flipToPageHandler={flipToPageHandler}
        currentPage={currentPage}
        pageNumber={index + 4}
        items={pageSpells}
        itemCategoryName={pageSpells[0]?.school.name || "Unknown"}
        pagesPerItem={pagesPerSpell}
      />
    );
  });

  if (shouldAddExtraPageAfterIndex) {
    bookPages.push(
      <Page key="extra-after-index" currentPage={currentPage}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8" />
      </Page>
    );
  }

  spells.forEach((spell, index) => {
    const basePageNumber = spellStartOffset + pagesPerSpell * index;

    bookPages.push(
      <GrimoireSpellGeneralDetailsPage
        key={`spell-general-${spell.index}`}
        spellIndex={spell.index}
        currentPage={currentPage}
        pageNumber={basePageNumber}
      />
    );

    bookPages.push(
      <GrimoireSpellExtraDetailsPage
        key={`spell-extra-details-${spell.index}`}
        spellIndex={spell.index}
        currentPage={currentPage}
        pageNumber={basePageNumber + 1}
      />
    );
  });

  if (shouldAddExtraPageAtEnd) {
    bookPages.push(
      <Page key="extra-at-end" currentPage={currentPage}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8" />
      </Page>
    );
  }

  bookPages.push(
    <Page key="thank-you-page" currentPage={currentPage}>
      <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
        <p className="page-text-lg text-center">
          Thank you for exploring the Grimoire! We hope you found the
          information about various spells insightful and engaging.
        </p>
      </div>
    </Page>
  );

  bookPages.push(
    <BookBackCover key="back-cover" currentPage={currentPage} />
  );

  return (
    <BookFrame
      fillParentWidth={false}
      key={`book-${spellsIndexPages.length}-${spells.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      {bookPages}
    </BookFrame>
  );
}