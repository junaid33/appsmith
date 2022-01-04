import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  Alignment,
  Button,
  Icon,
  Menu,
  MenuItem,
  Classes as BClasses,
} from "@blueprintjs/core";

import { Classes, Popover2 } from "@blueprintjs/popover2";
import { IconName } from "@blueprintjs/icons";
import tinycolor from "tinycolor2";

import { darkenActive, darkenHover } from "constants/DefaultTheme";
import {
  ButtonPlacement,
  ButtonVariant,
  ButtonVariantTypes,
} from "components/constants";
import { ThemeProp } from "components/ads/common";
import {
  getCustomBackgroundColor,
  getCustomBorderColor,
  getCustomHoverColor,
  getCustomTextColor,
  getCustomJustifyContent,
  getAlignText,
  WidgetContainerDiff,
  lightenColor,
} from "widgets/WidgetUtils";

type MenuButtonContainerProps = {
  disabled?: boolean;
};

export const MenuButtonContainer = styled.div<MenuButtonContainerProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  ${({ disabled }) => disabled && "cursor: not-allowed;"}

  & > .${Classes.POPOVER2_TARGET} {
    height: 100%;
  }
`;

const PopoverStyles = createGlobalStyle<{
  parentWidth: number;
  menuDropDownWidth: number;
  id: string;
  borderRadius: string;
}>`
  .menu-button-popover, .${BClasses.MINIMAL}.menu-button-popover.${
  Classes.POPOVER2
} {
    background: none;
    box-shadow: 0 6px 20px 0px rgba(0, 0, 0, 0.15) !important;
    margin-top: 8px !important;
    border-radius: ${({ borderRadius }) => borderRadius};
    box-shadow: none;
    overflow: hidden;
  }

  .menu-button-popover .${BClasses.MENU_ITEM} {
    padding: 9px 12px;
  }

  ${({ id, menuDropDownWidth, parentWidth }) => `
  .menu-button-width-${id} {

    max-width: ${
      menuDropDownWidth > parentWidth
        ? `${menuDropDownWidth}px`
        : `${parentWidth}px`
    } !important;
    min-width: ${
      parentWidth > menuDropDownWidth ? parentWidth : menuDropDownWidth
    }px !important;
  }
`}
`;

export interface BaseStyleProps {
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;

  buttonColor?: string;
  buttonVariant?: ButtonVariant;
  isCompact?: boolean;
  textColor?: string;
  placement?: ButtonPlacement;
}

const BaseButton = styled(Button)<ThemeProp & BaseStyleProps>`
  height: 100%;
  background-image: none !important;
  font-weight: ${(props) => props.theme.fontWeights[2]};
  outline: none;
  padding: 0px 10px;
  overflow: hidden;
  border: 1.2px solid #ebebeb;
  border-radius: 0;
  box-shadow: none !important;

  ${({ buttonColor, buttonVariant, theme }) => `
    &:enabled {
      background: ${
        getCustomBackgroundColor(buttonVariant, buttonColor) !== "none"
          ? getCustomBackgroundColor(buttonVariant, buttonColor)
          : buttonVariant === ButtonVariantTypes.PRIMARY
          ? theme.colors.button.primary.primary.bgColor
          : "none"
      } !important;
    }

    &:hover:enabled, &:active:enabled {
      background: ${
        getCustomHoverColor(theme, buttonVariant, buttonColor) !== "none"
          ? getCustomHoverColor(theme, buttonVariant, buttonColor)
          : buttonVariant === ButtonVariantTypes.SECONDARY
          ? theme.colors.button.primary.secondary.hoverColor
          : buttonVariant === ButtonVariantTypes.TERTIARY
          ? theme.colors.button.primary.tertiary.hoverColor
          : theme.colors.button.primary.primary.hoverColor
      } !important;
    }

    &:disabled {
      background-color: ${theme.colors.button.disabled.bgColor} !important;
      color: ${theme.colors.button.disabled.textColor} !important;
      pointer-events: none;
      border-color: ${theme.colors.button.disabled.bgColor} !important;
      > span {
        color: ${theme.colors.button.disabled.textColor} !important;
      }
    }

    border: ${
      getCustomBorderColor(buttonVariant, buttonColor) !== "none"
        ? `1px solid ${getCustomBorderColor(buttonVariant, buttonColor)}`
        : buttonVariant === ButtonVariantTypes.SECONDARY
        ? `1px solid ${theme.colors.button.primary.secondary.borderColor}`
        : "none"
    } !important;
    & > span {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      max-height: 100%;
      overflow: hidden;
      color: ${
        buttonVariant === ButtonVariantTypes.PRIMARY
          ? getCustomTextColor(theme, buttonColor)
          : getCustomBackgroundColor(
              ButtonVariantTypes.PRIMARY,
              buttonColor,
            ) !== "none"
          ? getCustomBackgroundColor(ButtonVariantTypes.PRIMARY, buttonColor)
          : `${theme.colors.button.primary.secondary.textColor}`
      } !important;
    }
  `}

  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow}  !important;
  ${({ placement }) =>
    placement
      ? `
      justify-content: ${getCustomJustifyContent(placement)};
      & > span.bp3-button-text {
        flex: unset !important;
      }
    `
      : ""}
`;

const BaseMenuItem = styled(MenuItem)<ThemeProp & BaseStyleProps>`
  ${({ backgroundColor, theme }) =>
    backgroundColor
      ? `
      background-color: ${backgroundColor} !important;
      &:hover {
        background-color: ${darkenHover(backgroundColor)} !important;
      }
      &:active {
        background-color: ${darkenActive(backgroundColor)} !important;
      }
  `
      : `
    background: none !important
      &:hover {
        background-color: ${tinycolor(
          theme.colors.button.primary.primary.textColor,
        )
          .darken()
          .toString()} !important;
      }
      &:active {
        background-color: ${tinycolor(
          theme.colors.button.primary.primary.textColor,
        )
          .darken()
          .toString()} !important;
      }
    `}
  ${({ textColor }) =>
    textColor &&
    `
      color: ${textColor} !important;
  `}
  ${({ isCompact }) =>
    isCompact &&
    `
      padding-top: 3px;
      padding-bottom: 3px;
      font-size: 12px;
  `}
`;

const StyledMenu = styled(Menu)<{
  borderRadius?: string;
  backgroundColor?: string;
}>`
  padding: 0;
  min-width: 0px;
  border-radius: ${({ borderRadius }) => borderRadius};
  overflow: hidden;

  .${BClasses.MENU_ITEM}:hover {
    background-color: ${({ backgroundColor }) => lightenColor(backgroundColor)};
  }
`;

export interface PopoverContentProps {
  menuItems: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      backgroundColor?: string;
      textColor?: string;
      iconName?: IconName;
      iconColor?: string;
      iconAlign?: Alignment;
      onClick?: string;
    }
  >;
  onItemClicked: (onClick: string | undefined) => void;
  isCompact?: boolean;
  borderRadius?: string;
  backgroundColor?: string;
}

function PopoverContent(props: PopoverContentProps) {
  const {
    backgroundColor,
    borderRadius,
    isCompact,
    menuItems: itemsObj,
    onItemClicked,
  } = props;

  if (!itemsObj) return <StyledMenu />;
  const items = Object.keys(itemsObj)
    .map((itemKey) => itemsObj[itemKey])
    .filter((item) => item.isVisible === true);

  const listItems = items.map((menuItem) => {
    const {
      backgroundColor,
      iconAlign,
      iconColor,
      iconName,
      id,
      isDisabled,
      label,
      onClick,
      textColor,
    } = menuItem;
    if (iconAlign === Alignment.RIGHT) {
      return (
        <BaseMenuItem
          backgroundColor={backgroundColor}
          disabled={isDisabled}
          isCompact={isCompact}
          key={id}
          labelElement={<Icon color={iconColor} icon={iconName} />}
          onClick={() => onItemClicked(onClick)}
          text={label}
          textColor={textColor}
        />
      );
    }
    return (
      <BaseMenuItem
        backgroundColor={backgroundColor}
        disabled={isDisabled}
        icon={<Icon color={iconColor} icon={iconName} />}
        isCompact={isCompact}
        key={id}
        onClick={() => onItemClicked(onClick)}
        text={label}
        textColor={textColor}
      />
    );
  });

  return (
    <StyledMenu backgroundColor={backgroundColor} borderRadius={borderRadius}>
      {listItems}
    </StyledMenu>
  );
}

export interface PopoverTargetButtonProps {
  borderRadius?: string;
  boxShadow?: string;

  buttonColor?: string;
  buttonVariant?: ButtonVariant;
  iconName?: IconName;
  iconAlign?: Alignment;
  isDisabled?: boolean;
  label?: string;
  placement?: ButtonPlacement;
}

function PopoverTargetButton(props: PopoverTargetButtonProps) {
  const {
    borderRadius,
    boxShadow,
    buttonColor,
    buttonVariant,
    iconAlign,
    iconName,
    isDisabled,
    label,
    placement,
  } = props;

  const isRightAlign = iconAlign === Alignment.RIGHT;

  if (iconAlign === Alignment.RIGHT) {
    return (
      <BaseButton
        alignText={getAlignText(isRightAlign, iconName)}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        buttonColor={buttonColor}
        buttonVariant={buttonVariant}
        disabled={isDisabled}
        fill
        rightIcon={iconName}
        text={label}
      />
    );
  }

  return (
    <BaseButton
      alignText={getAlignText(isRightAlign, iconName)}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      buttonColor={buttonColor}
      buttonVariant={buttonVariant}
      disabled={isDisabled}
      fill
      icon={isRightAlign ? undefined : iconName}
      placement={placement}
      rightIcon={isRightAlign ? iconName : undefined}
      text={label}
    />
  );
}

export interface MenuButtonComponentProps {
  label?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  isCompact?: boolean;
  menuItems: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      backgroundColor?: string;
      textColor?: string;
      iconName?: IconName;
      iconColor?: string;
      iconAlign?: Alignment;
      onClick?: string;
    }
  >;
  menuVariant?: ButtonVariant;
  menuColor?: string;
  borderRadius: string;
  boxShadow?: string;
  iconName?: IconName;
  iconAlign?: Alignment;
  onItemClicked: (onClick: string | undefined) => void;
  backgroundColor?: string;
  placement?: ButtonPlacement;
  width: number;
  widgetId: string;
  menuDropDownWidth: number;
}

function MenuButtonComponent(props: MenuButtonComponentProps) {
  const {
    borderRadius,
    boxShadow,
    iconAlign,
    iconName,
    isCompact,
    isDisabled,
    label,
    menuColor,
    menuDropDownWidth,
    menuItems,
    menuVariant,
    onItemClicked,
    placement,
    widgetId,
    width,
  } = props;
  const id = widgetId;

  return (
    <MenuButtonContainer disabled={isDisabled}>
      <PopoverStyles
        borderRadius={borderRadius}
        id={id}
        menuDropDownWidth={menuDropDownWidth}
        parentWidth={width - WidgetContainerDiff}
      />
      <Popover2
        content={
          <PopoverContent
            backgroundColor={menuColor}
            borderRadius={borderRadius}
            isCompact={isCompact}
            menuItems={menuItems}
            onItemClicked={onItemClicked}
          />
        }
        disabled={isDisabled}
        fill
        minimal
        placement="bottom-end"
        popoverClassName={`menu-button-popover menu-button-width-${id}`}
      >
        <PopoverTargetButton
          borderRadius={borderRadius}
          boxShadow={boxShadow}
          buttonColor={menuColor}
          buttonVariant={menuVariant}
          iconAlign={iconAlign}
          iconName={iconName}
          isDisabled={isDisabled}
          label={label}
          placement={placement}
        />
      </Popover2>
    </MenuButtonContainer>
  );
}

export default MenuButtonComponent;
