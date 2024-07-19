import { Dropdown } from "react-bootstrap";
import { ReviewOrder } from "../ReviewOrder";
import { ShowSideProviderNames } from "../ShowSideProvider";
import { useFCState } from "../state/FCState";

function SettingsMenu() {

  const reviewOrder = useFCState(state => state.reviewOrder);
  const setReviewOrder = useFCState(state => state.setReviewOrder);
  const showSideProviderName = useFCState(state => state.showSideProviderName);
  const setShowSideProviderName = useFCState(state => state.setShowSideProviderName);

  return (
    <Dropdown align="end">
      <style>
        {
          `
        #settingsToggle::after {
          display: none;
        }

        @media screen and (max-width: 576px) {
        .xs-full-width-dropdown {
            width: 100vw !important;
          }
        }

        @media screen and (min-width: 576px) {
          .xs-full-width-dropdown {
            min-width: max-content;
          }
        }
        `
        }
      </style>
      <Dropdown.Toggle
        id="settingsToggle"
        className="d-flex align-items-center flashcard-button border-0"
      >
        <span className="material-symbols-outlined"
          aria-hidden="true" aria-label="Settings"
        >
          settings
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="xs-full-width-dropdown">
        <Dropdown.ItemText className="d-flex align-items-center">
          Deck Review Settings
        </Dropdown.ItemText>
        <Dropdown.Divider />

        <Dropdown.ItemText className="d-flex align-items-center">
          Review order:
          <Dropdown>
            <Dropdown.Toggle className="flashcard-button border-0">
              {reviewOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                Object.values(ReviewOrder).map(order => (
                  <Dropdown.Item key={order}
                    onClick={() => setReviewOrder(order)}
                  >
                    {order}
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.ItemText>
        <Dropdown.ItemText className="d-flex align-items-center">
          Show side of card:
          <Dropdown>
            <Dropdown.Toggle className="flashcard-button border-0">
              {showSideProviderName.charAt(0).toUpperCase() +
                showSideProviderName.substring(1).toLowerCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                (ShowSideProviderNames).map(
                  providerName => (
                    <Dropdown.Item key={providerName} onClick={
                      () => setShowSideProviderName(providerName)
                    }>
                      {providerName.charAt(0).toUpperCase() +
                        providerName.substring(1).toLowerCase()}
                    </Dropdown.Item>
                  ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default SettingsMenu