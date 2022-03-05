import styled, { css } from 'styled-components'
import { NavBar } from '.';

export const Nav = styled.header`
  padding: 0 2rem;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-direction: row-reverse !important;
  flex-wrap: wrap !important;
  background: white !important;
  height: auto;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  border-bottom: 1px solid #F0F0F0;
  /* background: linear-gradient(0deg, rgba(221,221,221,1) 0%, rgba(245,245,245,1) 52%, rgba(255,255,255,1) 100%); */
`;

export const Hamburger = styled.div`
  flex-direction: column;
  user-select: none;
  .spanHamburger{
    height: 2px;
    width: 25px;
    background:#E414B2;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 958px) {
    display: flex;
  }
`;

export const Menu = styled.div<{isOpen: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-weight: bold;
  ${({ isOpen }) => isOpen && css`
      padding: 20px;
  `}
  a {
      ${({ isOpen }) => isOpen && css`
        margin-bottom: 20px;
      `}
      transition: all 0.8s ease-in;
  }
  @media (max-width: 958px) {
    overflow-y: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }: NavBar) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuLink = styled.a`
  cursor: pointer;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  color: #E414B2;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #4373cf;
  }
`;
