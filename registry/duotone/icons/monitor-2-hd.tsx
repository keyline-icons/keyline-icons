import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Hd({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 18L5 18C2.7908 18 1 16.2092 1 14L1 6C1 3.7908 2.7908 2 5 2L19 2C21.2092 2 23 3.7908 23 6L23 14C23 16.2092 21.2092 18 19 18L13 18L13 20L16 20C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22L8 22C7.4477 22 7 21.5523 7 21C7 20.4477 7.4477 20 8 20L11 20L11 18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6 6C6.5523 6 7 6.4477 7 7L7 9L9 9L9 7C9 6.4477 9.4477 6 10 6C10.5523 6 11 6.4477 11 7L11 13C11 13.5523 10.5523 14 10 14C9.4477 14 9 13.5523 9 13L9 11L7 11L7 13C7 13.5523 6.5523 14 6 14C5.4477 14 5 13.5523 5 13L5 7C5 6.4477 5.4477 6 6 6ZM14 6L15 6C16.0488 6.0412 17.1771 6.4879 17.8446 7.1554C18.5121 7.8229 19 8.9512 19 10C19 11.0488 18.5121 12.1771 17.8446 12.8446C17.1771 13.5121 16.0488 13.9588 15 14L14 14C13.4477 14 13 13.5523 13 13L13 7C13 6.4477 13.4477 6 14 6ZM15 12C15.6512 12.0412 16.0229 11.8379 16.4304 11.4304C16.8379 11.0229 17 10.6512 17 10C17 9.3488 16.8379 8.9771 16.4304 8.5696C16.0229 8.1621 15.6512 7.9588 15 8Z" fill="currentColor"/>
    </svg>
  )
}
