import styled from 'styled-components'

export const ErrorIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0,0,256,256'
      width='40px'
      height='35px'
      fill-rule='nonzero'
    >
      <g fill='#ff5c5c'>
        <g transform='scale(5.12,5.12)'>
          <path d='M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z'></path>
        </g>
      </g>
    </Svg>
  )
}

const Svg = styled.svg`
  /* padding: 5px;
  width: 19px;
  position: absolute;
  left: 20px;


  &:hover {
    fill: #000;
    cursor: pointer;
  } */
`
