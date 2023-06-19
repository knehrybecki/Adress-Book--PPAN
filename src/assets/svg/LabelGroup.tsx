import styled from 'styled-components'

export const LabelGroup = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 0 24 24'
      width='24px'
      fill='#8c8c8c'
      isSelected={isSelected}
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z' />
    </Svg>
  )
}

const Svg = styled.svg<{ isSelected: boolean }>`
  padding: 5px;
  width: 19px;
  position: absolute;
  left: 20px;
  fill: ${({ isSelected }) => (isSelected ? '#000' : '#8c8c8c')};

  &:hover {
    fill: #000;
    cursor: pointer;
  }
`
