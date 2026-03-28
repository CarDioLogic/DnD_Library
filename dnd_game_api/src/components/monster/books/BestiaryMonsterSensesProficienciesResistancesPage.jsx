import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterSensesProficienciesReactionsResistances } from "../../../../apiClient/monsterApi";
import Icon from "../../general/Icon";
import { formatSenses, formatProficiencies } from "../../../../Core/helpers";


const BestiaryMonsterSensesProficienciesResistancesPage  = forwardRef(
  ({ monsterIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getMonsterActions = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const monster = await fetchMonsterSensesProficienciesReactionsResistances(
          monsterIndex,
          controller.signal
        );

        return (
          <>
            {monster.proficiencies?.length > 0 && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Proficiencies:</strong> {formatProficiencies(monster.proficiencies)}</span>
              </div>
            )}
            {/* senses its an object not array */}
            {monster.senses && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Senses:</strong> {formatSenses(monster.senses)}</span>
              </div>
            )}
            {/* languages is a string */}
            {(monster.languages && monster.languages !== '') && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Languages:</strong> {monster.languages}</span>
              </div>
            )}
            {(monster.damage_vulnerabilities?.length > 0) && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Vulnerabilities:</strong> {monster.damage_vulnerabilities.join(",")}</span>
              </div>
            )}
            {(monster.damage_resistances?.length > 0) && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Resistances:</strong> {monster.damage_resistances.join(",")}</span>
              </div>
            )}
            {(monster.damage_immunities?.length > 0) && (
              <div className="mb-2">
                <span className="page-text-sm"><strong>Immunities:</strong> {monster.damage_immunities.join(",")}</span>
              </div>
            )}
            {monster.condition_immunities?.length > 0 && (
              <div className="mb-2">
                <span className="page-text-sm">
                  <strong>Condition Immunities:</strong>{" "}
                  {monster.condition_immunities.map((ci, index) => (
                    <span key={index} title={ci.desc}>
                      {ci.name}
                      {index < monster.condition_immunities.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
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
        return <div>Failed to load monster data.</div>;
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

BestiaryMonsterSensesProficienciesResistancesPage .displayName = "BestiaryMonsterSensesProficienciesResistancesPage ";

export default BestiaryMonsterSensesProficienciesResistancesPage ;