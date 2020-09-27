import { Typography } from "../../utils"

export const setIncrementBanner = (state) => {
  return {
    type: Typography.REWARD_INCREMENT_CHECK,
    payload: state
  }
}