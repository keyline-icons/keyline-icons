import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Couch({ size = 24, ...props }: IconProps) {
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
      <path d="M10 4L14 4C16.6168 3.9993 19.0155 5.4584 20.2181 7.7825C20.5779 8.4765 20.8183 9.2261 20.929 10L22 10C22.5523 10 23 10.4477 23 11L23 18C23 18.5523 22.5523 19 22 19L2 19C1.4477 19 1 18.5523 1 18L1 11C1 10.4477 1.4477 10 2 10L3.071 10C3.5083 6.978 5.8528 4.5874 8.8658 4.0916C9.2408 4.0305 9.6201 3.9999 10 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 4L14 4C16.6168 3.9993 19.0155 5.4584 20.2181 7.7825C20.5779 8.4765 20.8183 9.2261 20.929 10L22 10C22.5523 10 23 10.4477 23 11L23 18C23 18.5523 22.5523 19 22 19L2 19C1.4477 19 1 18.5523 1 18L1 11C1 10.4477 1.4477 10 2 10L3.071 10C3.5083 6.978 5.8528 4.5874 8.8658 4.0916C9.2408 4.0305 9.6201 3.9999 10 4ZM5.0999 10L6 10C6.5523 10 7 10.4477 7 11L7 13L11 13L11 6.0001L10 6.0001C8.1303 5.9994 6.4164 7.0421 5.5576 8.7029C5.3455 9.1119 5.1914 9.5485 5.0999 10ZM13 6.0001L13 13.0001L17 13.0001L17 11.0001C17 10.4478 17.4477 10.0001 18 10.0001L18.9002 10.0001C18.4841 7.9684 16.8584 6.4038 14.8123 6.0656C14.5438 6.0219 14.2721 6 14.0001 6.0001L13 6.0001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 18L19 20M5 18L5 20" fill="none"/>
    </svg>
  )
}
