import BookFrame from "../../flipbook/BookFrame";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import Loading from "../../general/Loading";
import { useEffect, useMemo, useState } from "react";
import { fetchSpells } from "../../../../apiClient/spellsApi";
import GrimoireSpellGeneralDetailsPage from "./GrimoireSpellGeneralDetailsPage";
import GrimoireSpellExtraDetailsPage from "./GrimoireSpellExtraDetailsPage";


export default function GrimoireBook() {
  const [spells, setSpells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingSpells, setLoadingSpells] = useState(false);
  const pagesPerSpell = 2; //general details + actions

  useEffect(() => {
    async function loadSpells() {
      let allSpells = [];
      setLoadingSpells(true);

      try {
          const data = await fetchSpells();

          const sortedBySchool = [...data].sort((a, b) =>
            a.school.index.localeCompare(b.school.index)
            );

          allSpells.push(...sortedBySchool);

        setSpells(allSpells);
      } catch (error) {
        console.error("Failed to load spells:", error);
      } finally {
        setLoadingSpells(false);
      }
    }

    loadSpells();
  }, []);

  function paginateSpells(spells, maxItemsPerPage = 10) {
    let allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousSpellSchool = "";

    for (let item of spells) {
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
        itemNbr: itemNbr,
        indexExtraContent: item.classes.map(c => (
            <Icon
            key={c.index}
            title={`Class: ${c.name}`}
            imgSrc={`/images/classes/${c.index}.svg`}
            altText="class icon"
            />
        ))
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

  const addExtraPageAtEnd = () => {
        //will use this to decide wether to add an extra empty page at the end so that the cover stays in the right position
      const lastPageAfterSpells =
        spells[spells.length - 1].itemNbr +  spellsIndexPages.length + 3;  
      return lastPageAfterSpells % 2 != 0;
  };

  const flipToPageHandler = (itemNbr) => {
    const nbrIndexPages = spellsIndexPages.length;

    const spellPage = (itemNbr) + nbrIndexPages + 4; //extra pages

    setFlipToPage(spellPage);
  };

  if (loadingSpells) {
    return <Loading/>;
  }

  return (
    <BookFrame
      fillParentWidth={false}
      key={`book-${spellsIndexPages.length}-${spells.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      <BookFrontCover currentPage={currentPage} title="Grimoire"/>

      <Page currentPage={currentPage}
      pageNumber={1}>
        <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
        </div>
      </Page>
      <Page currentPage={currentPage}
        pageNumber={2}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="page-text-2xl font-bold mb-4">Welcome to the Grimoire!</h1>
        </div>
      </Page>
      <Page currentPage={currentPage}
        pageNumber={3}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="page-text-2xl font-bold mb-4">Introduction</h1>
          <p className="text">
            This grimoire contains detailed knowledge of arcane spells and enchantments. Use the index to locate specific incantations and uncover their effects, uses, and hidden secrets.
          </p>
        </div>
      </Page>
      <Page currentPage={currentPage}
        pageNumber={4}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        </div>
      </Page>

      {spellsIndexPages.map((pageSpells, index) => (
        <IndexPage
          key={`index-page-${index}`}
          flipToPageHandler={flipToPageHandler}
          currentPage={currentPage}
          pageNumber={index + 5}
          items={pageSpells}
          itemCategoryName={pageSpells[0]?.school.name || "Unknown"}
          pagesPerItem={pagesPerSpell}
        />
      ))}

      {spells.flatMap((spell, index) => [
        <GrimoireSpellGeneralDetailsPage
          key={`spell-general-${spell.index}`}
          spellIndex={spell.index}
          currentPage={currentPage}
          pageNumber={spellsIndexPages.length + 5 + pagesPerSpell * index}
        />,
        <GrimoireSpellExtraDetailsPage
          key={`spell-extra-details-${spell.index}`}
          spellIndex={spell.index}
          currentPage={currentPage}
          pageNumber={spellsIndexPages.length + 6 + pagesPerSpell * index}
        />,
      ])}

      { addExtraPageAtEnd && (
        <Page currentPage={currentPage}>
          <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          </div>
        </Page>
      )}

      <Page currentPage={currentPage}>
        <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
          <p className="page-text-lg text-center">
            Thank you for exploring the Grimoire! We hope you found the information about various spells insightful and engaging.
          </p>
        </div>
      </Page>
      <BookBackCover currentPage={currentPage} />
    </BookFrame>
  );
}