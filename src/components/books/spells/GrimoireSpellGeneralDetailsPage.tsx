import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import { fetchSpellDetails } from "../../../../apiClient/spellsApi";
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
            <div className="">
              <div className="flex gap-1">
                <h1 className="page-text-2xl">{spell.name}</h1>

                { spell.concentration && (
                  <Icon
                    key={spell.index}
                    title={`Cast requires concentrion`}
                    imgSrc={`/images/misc/spiked-halo.svg`}
                    altText="class icon"
                  />
                )}
                { spell.ritual && (
                  <Icon
                    key={spell.ritual}
                    title={`Spell is ritual`}
                    imgSrc={`/images/misc/ritual.svg`}
                    altText="class icon"
                  />
                )}
              </div>
              <p>{spell.school.name}</p>
            </div>            
            <hr/>
            <div className="">
              <p className="page-text-sm"><strong className="mr-2">Casting time:</strong>{spell.casting_time}</p>
              <p className="page-text-sm"><strong className="mr-2">Range:</strong>{spell.range}</p>
              <p className="page-text-sm"><strong className="mr-2">Duration:</strong>{spell.duration}</p>
            </div>
            <p className="page-text-xs">{spell.desc}</p>
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