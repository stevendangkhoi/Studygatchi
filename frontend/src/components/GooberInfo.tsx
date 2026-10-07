import "./GooberInfo.css";

interface Props {
  currentXP: number;
  level: number;
  money: number;
  currentHealth: number;
}

export default function GooberInfo({
  currentXP,
  level,
  money,
  currentHealth,
}: Props) {
  return (
    <>
      <div className = "gooberInfo"
        style={{
          margin: "-16px",
          padding: "10px",
          marginTop: "0px",
        }}
      >
        <div>
          <text>progress to level: {level + 1}</text>
          <div
            className="progress"
            role="progressbar"
            aria-label="XP bar"
            aria-valuenow={currentXP}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              style={{ width: currentXP + "%" }}
            ></div>
          </div>
        </div>
        <div>
          <text>current health: {currentHealth.toFixed(1)} / 100 HP</text>
          <div
            className="progress"
            role="progressbar"
            aria-label="Health Bar"
            aria-valuenow={currentHealth}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              style={{ width: currentHealth + "%" }}
            ></div>
          </div>
        </div>
        <div>
          <text>Cash money: ${money}</text>
        </div>
      </div>
      <div className = "gooberInfo"
        style={{
          margin: "-16px",
          marginTop: "30px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        Shop
      </div>
      <div className = "gooberInfo"
        style={{
          margin: "-16px",
          marginTop: "30px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <text>study!</text>
      </div>
    </>
  );
}
