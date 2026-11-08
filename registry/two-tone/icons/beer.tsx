import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beer({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 7C20 8.446 19.2208 9.756 18 10.461V11C20.2092 11 22 12.791 22 15C22 17.209 20.2092 19 18 19C18 21.209 16.2092 23 14 23H8C5.7908 23 4 21.209 4 19V10.461C2.7792 9.756 2 8.446 2 7C2 4.791 3.7908 3 6 3C6.4822 3 6.9562 3.087 7.4004 3.253C8.0516 1.912 9.426 1 11 1C12.5738 1 13.9474 1.913 14.5986 3.253C15.0431 3.087 15.5175 3 16 3C18.2092 3 20 4.791 20 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 9.828V19C5 20.657 6.3431 22 8 22H14C15.6569 22 17 20.657 17 19V18M5 9.828C3.8014 9.405 3 8.271 3 7C3 5.343 4.3431 4 6 4C6.742 4 7.4576 4.275 8.0087 4.772C8.128 3.208 9.4317 2 11 2C12.5683 2 13.872 3.208 13.9913 4.772C14.5424 4.275 15.258 4 16 4C17.6569 4 19 5.343 19 7C19 8.271 18.1986 9.405 17 9.828M5 9.828H17M17 18V12M17 18H18C19.6569 18 21 16.657 21 15C21 13.343 19.6569 12 18 12H17M17 9.828V12M9 14V18M13 14V18"/>
    </svg>
  )
}
