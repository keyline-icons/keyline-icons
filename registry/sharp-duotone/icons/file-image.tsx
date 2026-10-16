import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileImage({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1L14 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13 1L14.4142 1L21 7.5858L21 9L13 9ZM15 4.4142L15 7L17.5858 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.7071 16.2929L9.9999 12.0001L18.5528 16.2764"/>
      <path d="M10.5 7C10.5 7.8284 9.8284 8.5 9 8.5C8.1716 8.5 7.5 7.8284 7.5 7C7.5 6.1716 8.1716 5.5 9 5.5C9.8284 5.5 10.5 6.1716 10.5 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
