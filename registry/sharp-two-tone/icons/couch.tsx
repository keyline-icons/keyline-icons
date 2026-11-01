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
      <path d="M19 18L5 18M19 18L22 18L22 11L20 11M5 18L2 18L2 11L4 11M12 5L10 5C6.6863 5 4 7.6863 4 11M12 5L14 5C17.3137 5 20 7.6863 20 11M12 5L12 14M12 14L6 14L6 11L4 11M12 14L18 14L18 11L20 11M19 18L19 20M5 18L5 20" fill="none"/>
    </svg>
  )
}
