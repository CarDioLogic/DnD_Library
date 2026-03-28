import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterActions } from "../../../../apiClient/monsterApi";
import Icon from "../../general/Icon";
import { feetToMeters } from "../../../../Core/helpers";

const BestiaryMonsterActionsPage = forwardRef(
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

        console.log("Loaded monster actions TESTE:", monster);

        return (
          <>
            <div className="mb-2">
              <h2 className="font-bold">Movement:</h2>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {Object.entries(monster.speed || {})
                  .filter(([_, value]) => value)
                  .map(([type, value]) => (
                    <div key={type}>
                      <Icon
                        title={`Movement type: ${type}`}
                        imgSrc={`/images/movement/${type}.svg`}
                        label={
                          type === "hover"
                            ? value
                              ? "yes"
                              : "no"
                            : `${feetToMeters(value)} m`
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>

            {monster.actions && (
              <div className="mb-2">
                <h2 className="font-bold">Actions:</h2>
                <div className="flex flex-col items-start gap-2 page-text-sm">
                  {monster.actions.map((action, actionIndex) => (
                    <div
                      key={actionIndex}
                      className="italic w-full"
                      title={action.desc}
                    >
                      <div
                        className={
                          action.actions
                            ? ""
                            : "flex flex-wrap items-center justify-between"
                        }
                      >
                        <p className="font-semibold">{action.name}:</p>

                        {action.actions?.map((subAction, index) => (
                          <p key={index} className="text-end">
                            {subAction.action_name}{" "}
                            <strong>({subAction.count}x)</strong>
                          </p>
                        ))}

                        {action.damage?.map((dmg, index) => {
                          if (!dmg) return null;

                          return (
                            <div key={index} className="flex items-center gap-2">
                              {dmg.damage_dice && (
                                <p>
                                  {dmg.damage_dice}{" "}
                                  {action.attack_bonus
                                    ? `+${action.attack_bonus}`
                                    : ""}
                                </p>
                              )}

                              {dmg.damage_type?.name && (
                                <Icon
                                  title={dmg.damage_type.name}
                                  imgSrc={`/images/damageTypes/${dmg.damage_type.name}.svg`}
                                />
                              )}
                            </div>
                          );
                        })}
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
            )}
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

BestiaryMonsterActionsPage.displayName = "BestiaryMonsterActionsPage";

export default BestiaryMonsterActionsPage;