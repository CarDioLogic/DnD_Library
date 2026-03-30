import { useEffect, useMemo, useState } from "react";
import BookFrame from "../../flipbook/BookFrame";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import Loading from "../../general/Loading";
import { fetchEquipments } from "../../../../apiClient/equipmentsApi";
import EquipmentsGeneralDetailsPage from "./EquipmentsGeneralDetailsPage";


export default function EquipmentsBook() {
  const [equipments, setEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingEquipments, setLoadingEquipments] = useState(false);

  const pagesPerAilment = 1;

  useEffect(() => {
    async function loadEquipments() {
      setLoadingEquipments(true);

      try {
        const data = await fetchEquipments();
        console.log("data fetched", data)

        const sorted = [...data].sort((a, b) => {
          const eqA = a.equipment_category?.name ?? "";
          const eqB = b.equipment_category?.name ?? "";

          const gearA = a.gear_category?.name ?? "";
          const gearB = b.gear_category?.name ?? "";

          // First: equipment_category
          const equipmentCompare = eqA.localeCompare(eqB);
          if (equipmentCompare !== 0) return equipmentCompare;

          // Then: gear_category
          return gearA.localeCompare(gearB);
        });

        const equipments = [
          ...sorted.map(equipment => ({
            ...equipment,

            type: "condition"
          })),
        ];

        setEquipments(equipments);

      } catch (error) {
        console.error("Failed to load equipments:", error);
      } finally {
        setLoadingEquipments(false);
      }
    }

    loadEquipments();
  }, []);

  function paginateEquipments(equipmentsList, maxItemsPerPage = 9) {
    const allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousEquipmentCat = "";
    let previousGearCat = "";

    for (const item of equipmentsList) {
      if (
        resetCounter >= maxItemsPerPage ||
        ((previousEquipmentCat && previousEquipmentCat !== item.equipment_category?.name) ||
        (previousGearCat && previousGearCat !== item.gear_category?.name))
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        resetCounter = 0;
      }

      currentPageItems.push({
        ...item,
        itemNbr,
      });

      itemNbr += pagesPerAilment;
      resetCounter++;
      previousEquipmentCat = item.equipment_category?.name;
      previousGearCat = item.gear_category?.name;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const equipmentsIndexPages = useMemo(() => {
    return paginateEquipments(equipments, 10);
  }, [equipments]);

  const shouldAddExtraPageAfterIndex = equipmentsIndexPages.length % 2 == 0;

  const shouldAddExtraPageAtEnd = true;

  const flipToPageHandler = (itemNbr) => {
    const numberOfIndexPages = equipmentsIndexPages.length;

    const ailmentPage =
      itemNbr +
      numberOfIndexPages +
      3 +
      (shouldAddExtraPageAfterIndex ? 1 : 0);

    setFlipToPage(ailmentPage);
  };

  if (loadingEquipments) {
    return <Loading />;
  }

  const ailmentStartOffset =
    equipmentsIndexPages.length + (shouldAddExtraPageAfterIndex ? 5 : 4);

  const bookPages = [];

  bookPages.push(
    <BookFrontCover
      key="front-cover"
      currentPage={currentPage}
      title="Equipments"
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
          Welcome to the Equipments list!
        </h1>
      </div>
    </Page>
  );

  bookPages.push(
    <Page key="page-3" currentPage={currentPage} pageNumber={3}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">Introduction</h1>
        <p className="text">
          This list provides a comprehensive overview of known equipments and items. Refer to the index to explore their characteristics, impacts, and documented treatments.
        </p>
      </div>
    </Page>
  );

  equipmentsIndexPages.forEach((pageEquipments, index) => {
    bookPages.push(
      <IndexPage
        key={`index-page-${index}`}
        flipToPageHandler={flipToPageHandler}
        currentPage={currentPage}
        pageNumber={index + 4}
        items={pageEquipments}
        itemCategoryName={
          [
            pageEquipments[0]?.equipment_category?.name,
            pageEquipments[0]?.gear_category?.name,
          ]
            .filter(Boolean)
            .join(" - ") || "Unknown"
        }
        pagesPerItem={pagesPerAilment}
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

  // equipments.forEach((ailment, index) => {
  //   const basePageNumber = ailmentStartOffset + pagesPerAilment * index;
  //   bookPages.push(
  //     <EquipmentsGeneralDetailsPage
  //       // ailmentType={ailment.type}
  //       key={`ailment-general-${ailment.index}`}
  //       ailmentIndex={ailment.index}
  //       currentPage={currentPage}
  //       pageNumber={basePageNumber}
  //     />
  //   );

  // });

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
          Thank you for exploring the Equipments! We hope you found the
          information about various equipments insightful and engaging.
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
      key={`book-${equipmentsIndexPages.length}-${equipments.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      {bookPages}
    </BookFrame>
  );
}