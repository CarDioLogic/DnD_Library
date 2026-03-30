import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import { fetchDamageTypeDetails, fetchConditionDetails } from "../../../../apiClient/ailmentsApi";

const AilmentsGeneralDetailsPage = forwardRef(
  ({ ailmentType = "condition", ailmentIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getAilmentDetails = useCallback(async () => {
      if(ailmentType != 'condition' && ailmentType != 'damageType') throw Error(`Invalid ailment type: ${ailmentType}`);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        let ailment = null;

        console.log("ailment type", ailmentType);
        if(ailmentType == "condition"){
          ailment = await fetchConditionDetails(
            ailmentIndex,
            controller.signal
          );
        } else if (ailmentType == "damageType"){
          ailment = await fetchDamageTypeDetails(
            ailmentIndex,
            controller.signal
          );
        }

        return (
          <>
            <div className="flex gap-1">
              <h1 title="" className="page-text-xl font-bold break-words leading-none">{ailment.name}</h1>
              <p title="Ailment description" className="break-words">({ailmentType})</p>
            </div>            
            <p title="Ailment description" className="break-words">{ailment.desc}</p>
          </>
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load ailment details:", error);
        return <div>Failed to load ailment details.</div>;
      }
    }, [ailmentIndex]);

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
        pagePrefix={`${ailmentIndex} - `}
        getPageContentFunc={getAilmentDetails}
      />
    );
  }
);

AilmentsGeneralDetailsPage.displayName = "AilmentsGeneralDetailsPage";

export default AilmentsGeneralDetailsPage;