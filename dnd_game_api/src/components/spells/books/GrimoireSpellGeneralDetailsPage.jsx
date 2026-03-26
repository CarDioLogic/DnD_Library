import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchSpellDetails } from "../../../../apiClient/spellsApi";
import Icon from "../../general/Icon";
import { ABILITIES } from "../../../../Data/Abilities";
import { formatAbilityModifier, } from "../../../../Core/helpers";

const GrimoireSpellGeneralDetailsPage = forwardRef(
  ({ spellIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getSpellDetails = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const spell = await fetchSpellDetails(
          spellIndex,
          controller.signal
        );
      
        return (
          <>
            <h1>{spell.name}</h1>
          </>
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load spell details:", error);
        return <div>Failed to load spell details.</div>;
      }
    }, [spellIndex]);

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
        pagePrefix={`${spellIndex} - `}
        getPageContentFunc={getSpellDetails}
      />
    );
  }
);

GrimoireSpellGeneralDetailsPage.displayName = "GrimoireSpellGeneralDetailsPage";

export default GrimoireSpellGeneralDetailsPage;