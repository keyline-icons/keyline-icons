import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointerDown({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5179 12.3077L10.0066 20.7192C9.8541 21.568 9.0731 22.1289 8.2588 21.9744C7.4413 21.8193 6.8991 21.0021 7.0478 20.149L8.6441 10.9876C8.7288 10.5011 8.1321 10.1993 7.7905 10.5558L6.2134 12.2015C5.7652 12.6692 5.0587 12.7302 4.543 12.3458C3.9884 11.9324 3.8353 11.1416 4.1924 10.5359L5.7051 7.9709C8.9257 1.8096 12.6831 1.8096 14.8301 2.0898C20.7345 3.2101 20.4661 12.1717 19.3926 13.572C18.3191 14.9722 17.1966 13.547 17.1966 12.9871M10.8379 16.0924L12.2681 16.2313C13.1075 16.311 13.8637 15.7017 14.0023 14.8341L14.4512 12.0244M17.4338 11.7497L16.9103 14.4812C16.7908 15.1047 16.2925 15.5718 15.6857 15.6294C14.7425 15.7189 13.9351 14.7755 14.1648 13.8166" fill="none"/>
    </svg>
  )
}
