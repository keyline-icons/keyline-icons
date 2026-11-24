import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBaby({ size = 24, ...props }: IconProps) {
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
      <path d="M10 9L8 9C7.4477 9 7 8.5523 7 8L7 6C7 5.4477 7.4477 5 8 5L8.652 5C8.6835 4.9104 8.72 4.8239 8.7618 4.7403C8.9379 4.388 9.1778 4.158 9.2929 4.0429C9.4161 3.9197 9.4351 3.8935 9.4493 3.8653C9.4569 3.8503 9.5 3.7623 9.5 3.5C9.5 2.1193 10.6193 1 12 1C13.3807 1 14.5 2.1193 14.5 3.5C14.5 3.7619 14.543 3.85 14.5507 3.8653C14.5648 3.8933 14.5835 3.9193 14.7071 4.0429C14.8222 4.158 15.0621 4.388 15.2382 4.7403C15.28 4.8239 15.3165 4.9104 15.348 5L16 5C16.5523 5 17 5.4477 17 6L17 8C17 8.5523 16.5523 9 16 9L12 9ZM12 23L7 23C6.4477 23 6 22.5523 6 22L6 17L6 12C6 11.4477 6.4477 11 7 11L11.9999 11L17 11.0002C17.5523 11.0002 18 11.4479 18 12.0002L18 14L18 18L18 22C18 22.5523 17.5523 23 17 23ZM16 19L16 17L14 17L13 17L13 19L14 19ZM16 15L16 13L14 13L13 13L13 15L14 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
