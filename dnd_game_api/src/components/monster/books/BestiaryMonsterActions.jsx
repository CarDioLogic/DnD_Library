import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterActions } from "../../../../apiClient/monsterApi";
import Icon from "../../general/Icon";
import { feetToMeters } from "../../../../Core/helpers";


const BestiaryMonsterActions = forwardRef(
  ({ monsterIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getMonsterActions = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const monster = await fetchMonsterActions(
          monsterIndex,
          controller.signal
        );
        console.log("Loaded monster actions:", monster);
        return (
          <div>
              <h1>Monster actions</h1>
              <div className="flex items-center gap-4 mb-4">
                {Object.entries(monster.speed)
                  .filter(([_, value]) => value)
                  .map(([type, value]) => (
                    <div key={type} className="">
                      <Icon
                        title={`Movement type: ${type}`}
                        imgSrc={`/images/movement/${type}.svg`}
                        label={`${feetToMeters(value)} m`}></Icon>
                    </div>
                  ))}
              </div>
          </div>
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load monster actions:", error);
        return <div>Failed to load monster actions.</div>;
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
        pagePrefix={`${monsterIndex} - `}
        getPageContentFunc={getMonsterActions}
      />
    );
  }
);

BestiaryMonsterActions.displayName = "BestiaryMonsterActions";

export default BestiaryMonsterActions;