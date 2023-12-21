

interface SuccessRateProps {
  success: number;
  tries: number;
  target: number;
}
/* this component is for getting succes and tries and move it to precentege while also determine the color
green above target yellow until 40 under and red under this */
export const SuccessRate = ({ success, tries, target }: SuccessRateProps): JSX.Element => {
  const calculateSuccessRate = (): number => {
    return tries !== 0 ? (success / tries) * 100 : 0; // Avoid division by zero
  };

  const successRate = calculateSuccessRate();

  const determineColor = (): string => {
    const rate = successRate;
    if (rate >= target) {
      return 'green'; // Add green style
    } else if (rate >= target - 40) {
      return 'yellow'; // Add yellow style
    } else {
      return 'red'; // Add red style
    }
  };

  const color = determineColor();

  return (
    <div className={`success-rate ${color}`}>
 {successRate.toFixed(2)}%
    </div>
  );
};
