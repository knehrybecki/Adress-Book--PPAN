export type AppTheme = {
  title: {
    fontSize: string
  }
  header: {
    colorHeader: string
    backgroundHeader: string
  }
  LoadApp: {
    Background: string
    loading: {
      Green: string
      red: string
    }
  }
  login: {
    buttonLogin: {
      color: string
      backgroundColor: string
      border: string
    }
    copyrightFont: string
  }
  sideBox: {
    borderColor: string
    title: {
      fontSize: string
      color: string
    }
    createContact: {
      color: string
      fontSize: string
      fontWeight: string
    }
    groupTitle: {
      color: string
      fontSize: string
      fontWeight: string
    }
    group: {
      color: string
      fontSize: string
      selectedColor: string
      selectedColorHover: string
    }
  }
  media: {
    xs: number
    sm: number
    md: number
    lg: number
  }
}
