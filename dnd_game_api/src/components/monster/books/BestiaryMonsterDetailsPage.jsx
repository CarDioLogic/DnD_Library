import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterDetails } from "../../../../apiClient/monsterApi";

const BestiaryMonsterDetailsPage = forwardRef(
  ({ monsterIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getMonsterDetails = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const monster = await fetchMonsterDetails(
          monsterIndex,
          controller.signal
        );

        return (
          <div>
            <h1>{monster.name}</h1>
            <p>Type: {monster.type}</p>
            <p>HP: {monster.hit_points}</p>
            <p>XP: {monster.xp}</p>
          </div>
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load monster details:", error);
        return <div>Failed to load monster details.</div>;
      }
    }, [monsterIndex]);

    useEffect(() => {
      return () => {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }
      };
    }, []);

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        getPageContentFunc={getMonsterDetails}
      />
    );
  }
);

BestiaryMonsterDetailsPage.displayName = "BestiaryMonsterDetailsPage";

export default BestiaryMonsterDetailsPage;