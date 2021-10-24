import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { setLanguage } from "../../actions/settingsActions";

import { languages } from "../../config";

const StyledFooter = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 36px;
  color: #fff;
  background-color: #1d4886;
  border-top: 1px solid #eee;
`;

const LanguageSelector = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const LanguageItem = styled.li`
  list-style-type: none;
  padding-left: 16px;

  &:first-child {
    padding-left: 0;
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      opacity: 0.5;
      cursor: pointer;
    `}
`;

const Footer = ({ setLanguage }) => {
  const { i18n } = useTranslation();

  /**
   * Handle changing of language
   *
   * @param lang
   */
  const handleLanguageChange = (lang = "en") => {
    setLanguage(lang);

    return i18n.changeLanguage(lang);
  };

  return (
    <StyledFooter>
      <LanguageSelector>
        {languages.map(({ lang, name }) => {
          return (
            <LanguageItem
              key={lang}
              isActive={lang === i18n.language}
              onClick={() => handleLanguageChange(lang)}
            >
              {name}
            </LanguageItem>
          );
        })}
      </LanguageSelector>
    </StyledFooter>
  );
};

Footer.propTypes = {
  settings: PropTypes.object,
  setLanguage: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  settings: state.settings,
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) => dispatch(setLanguage(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
