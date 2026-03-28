import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterSpecialAndLegendaryActions } from "../../../../apiClient/monsterApi";
import Icon from "../../general/Icon";
import { feetToMeters } from "../../../../Core/helpers";


const BestiaryMonsterSpecialActionsPage = forwardRef(
  ({ monsterIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getMonsterActions = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const monster = await fetchMonsterSpecialAndLegendaryActions(
          monsterIndex,
          controller.signal
        );

        if(!monster.legendary_actions && !monster.special_abilities){
          return (
            <div className="text-center h-full w-full flex flex-col items-center justify-center p-8">
              <h1 className="text-2xl font-bold mb-4">No special or legendary actions</h1>
              <p className="text">This monster does not have any special or legendary actions.</p>
            </div>
          )
        }

        return (
          <>
            <div className="mb-2">
              <h2 className="font-bold">Lengendary actions:</h2>
              <div className="flex flex-col items-start gap-2 page-text-sm"> 
               {monster.legendary_actions?.map((action, actionIndex) => (
                  <div key={actionIndex} className="italic w-full" title={action.desc}>
                    <div className="">
                      <p className="font-semibold">{action.name}:</p>
                      {action.damage?.map((dmg, index) => (
                        <div key={index} className="flex items-center justify-end gap-2">
                          <p className="">
                            {`${dmg.damage_dice} ${action.attack_bonus ? `+${action.attack_bonus}` : ""}`}
                          </p>
                          <Icon
                            title={dmg.damage_type.name}
                            imgSrc={`/images/damageTypes/${dmg.damage_type.name}.svg`}
                          />
                        </div>
                      ))}
                    </div>
                      {action.dc && (
                        <p className="text-right">
                          Check: {action.dc.dc_value} ({action.dc.dc_type.name})
                        </p>
                      )}
                  </div>
                ))}
              </div>
            </div>

             <div className="mb-2">
              <h2 className="font-bold">Special abilities:</h2>
              <div className="flex flex-col items-start gap-2 page-text-sm"> 
                {monster.special_abilities?.map((sa, actionIndex) => (
                  <div key={actionIndex} className="italic w-full" title={sa.desc}>
                    <div>
                      <p className="font-semibold">{sa.name}:</p>
                      <p className="page-text-xs">{sa.desc}:</p>

                      {(Array.isArray(sa.usage) ? sa.usage : sa.usage ? [sa.usage] : []).map((us, index) => (
                        <div key={index} className="flex items-center justify-end gap-2">
                          <p>{`${us.type} (${us.times}x)`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
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

BestiaryMonsterSpecialActionsPage.displayName = "BestiaryMonsterSpecialActionsPage";

export default BestiaryMonsterSpecialActionsPage;