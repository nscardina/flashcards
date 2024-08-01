import { Dropdown } from "react-bootstrap";
import { makeReviewOrderProvider, ReviewOrder } from "../ReviewOrder";
import { ShowSideProviderNames } from "../ShowSideProvider";
import { useContext } from "react";
import { AppState } from "../App";
import Dialog from "../app/Dialog";

function SettingsMenu() {

  const appState = useContext(AppState)

  return (
    <Dropdown align="end" style={{width: "min-content", padding: "0px"}}>
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
              {appState.reviewOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                Object.values(ReviewOrder).map(order => (
                  <Dropdown.Item key={order}
                    onClick={() => {
                      appState.setReviewOrder(order);
                      appState.setReviewOrderProvider(makeReviewOrderProvider(order)(appState.deck?.cards.length ?? 0));
                      appState.setReviewOrderProviderNextValue(appState.reviewOrderProvider.next());
                    }}
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
              {appState.showSideProviderName.charAt(0).toUpperCase() +
                appState.showSideProviderName.substring(1).toLowerCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                (ShowSideProviderNames).map(
                  providerName => (
                    <Dropdown.Item key={providerName} onClick={
                      () => appState.setShowSideProviderName(providerName)
                    }>
                      {providerName.charAt(0).toUpperCase() +
                        providerName.substring(1).toLowerCase()}
                    </Dropdown.Item>
                  ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => {
            appState.setVisibleDialog(Dialog.CREDITS);
          }}>
            Show Credits
          </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default SettingsMenu