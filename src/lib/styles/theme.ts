import { AppTheme } from 'lib/types'

export const theme: AppTheme = {
  title: {
    fontSize: '26px',
  },
  header: {
    colorHeader: '#fff',
    backgroundHeader: '#e30613',
  },
  LoadApp: {
    Background: '#000',
    loading: {
      Green: '#0dff00',
      red: '#ff0000',
    },
  },
  login: {
    buttonLogin: {
      color: '#fff',
      backgroundColor: '#000',
      border: '#00',
    },
    copyrightFont: '10px',
  },
  sideBox: {
    borderColor: '#A8A8A8',
    title: {
      fontSize: '22px',
      color: '#696969',
    },
    createContact: {
      color: '#000',
      fontSize: '16px',
      fontWeight: 'light',
    },
    groupTitle: {
      color: '#000',
      fontSize: '17px',
      fontWeight: '700',
    },
    group: {
      color: '#000',
      fontSize: '19px',
      selectedColor: '#FFED00',
      selectedColorHover: '#E8E8E8',
    },
  },
  media: {
    xs: 550,
    sm: 768,
    md: 992,
    lg: 1200,
  },
}
