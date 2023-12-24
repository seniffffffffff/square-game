import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TGameModeListRes } from "../api/rest/gameMode/types";
import { SelectComp } from "../components/Select/Select";
import { SquareList } from "./SquaresGame/components/SquareList/SquareList";
import { TField } from "./SquaresGame/types/types";
import { InfoRows } from "./SquaresGame/components/InfoRows/InfoRows";
import Button from "../components/Button/Button";
import "./SquaresGame.css";

export const SquaresGame: React.FC = () => {
  const [gameModes, setGameModes] = useState<TGameModeListRes>([]);
  const [hoveredSquares, setHoveredSquares] = useState<TField[]>([]);
  const [fields, setFields] = useState<TField[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>();

  const selectOptions = useMemo(() => {
    return gameModes.map((mode) => ({
      value: mode.id,
      label: mode.name,
    }));
  }, [gameModes]);

  const getGameMode = (id: string) => {
    setHoveredSquares([]);

    const selectedMode = gameModes.find((mode) => mode.id === id);
    if (selectedMode) {
      setFields(
        Array(selectedMode.field)
          .fill("", 0, selectedMode.field)
          .map((_, i) => {
            return { value: i, isHovered: false };
          })
      );
    }
  };

  const fetchSquares = async () => {
    try {
      const { data } = await axios.get(
        "https://60816d9073292b0017cdd833.mockapi.io/modes"
      );
      setGameModes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addNewField = (field: TField) => {
    const isFieldExist = hoveredSquares.find((i) => i.value === field.value);

    setFields(
      fields.map((i) => {
        if (i.value === field.value) {
          return { ...i, isHovered: !i.isHovered };
        }
        return i;
      })
    );

    if (isFieldExist) {
      setHoveredSquares(hoveredSquares.filter((i) => i.value !== field.value));
    } else {
      setHoveredSquares([...hoveredSquares, field]);
    }
  };

  const handleButtonClick = () => {
    getGameMode(`${selectedMode}`);
  };

  const renderInfoRows = (field: TField) => (
    <InfoRows key={field.value} field={field} />
  );

  useEffect(() => {
    fetchSquares();
  }, []);

  return (
    <div className="squares-game-content">
      <div className="game-div">
        <div className="start-game">
          <SelectComp
            onChange={(newValue) => setSelectedMode(`${newValue?.value}`)}
            options={selectOptions}
            placeholder="Pick mode"
          />
          <Button buttonText="START" onClick={handleButtonClick} />
        </div>
        {fields.length > 0 && (
          <SquareList fields={fields} addNewField={addNewField} />
        )}
      </div>

      <div className="hovered-squares">
        <h2 className="title">Hover squares</h2>
        <div className="hovered-squares-info">
          {hoveredSquares.map(renderInfoRows)}
        </div>
      </div>
    </div>
  );
};
