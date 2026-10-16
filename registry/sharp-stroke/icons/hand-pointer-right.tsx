import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointerRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.3077 11.5179L20.7192 10.0066C21.568 9.8541 22.1289 9.0731 21.9744 8.2588C21.8193 7.4413 21.0021 6.8991 20.149 7.0478L10.9876 8.6441C10.5011 8.7288 10.1993 8.1321 10.5558 7.7905L12.2015 6.2134C12.6692 5.7652 12.7302 5.0587 12.3458 4.543C11.9324 3.9884 11.1416 3.8353 10.5359 4.1924L7.9709 5.7051C1.8096 8.9257 1.8096 12.6831 2.0898 14.8301C3.2101 20.7345 12.1717 20.4661 13.572 19.3926C14.9722 18.3191 13.547 17.1966 12.9871 17.1966M16.0924 10.8379L16.2313 12.2681C16.311 13.1075 15.7017 13.8637 14.8341 14.0023L12.0244 14.4512M11.7497 17.4338L14.4812 16.9103C15.1047 16.7908 15.5718 16.2925 15.6294 15.6857C15.7189 14.7425 14.7755 13.9351 13.8166 14.1648" fill="none"/>
    </svg>
  )
}
