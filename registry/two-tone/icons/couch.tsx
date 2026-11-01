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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 4L14 4C16.6168 3.9993 19.0155 5.4584 20.2181 7.7825C20.6019 8.5226 20.8495 9.3258 20.9492 10.1536C22.174 10.5623 23 11.7088 23 13L23 15C23 17.2092 21.2092 19 19 19L5 19C2.7908 19 1 17.2092 1 15L1 13C1 11.7088 1.826 10.5623 3.0508 10.1536C3.4278 7.0657 5.7963 4.5966 8.8658 4.0916C9.2408 4.0305 9.6201 3.9999 10 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 18L5 18M19 18C20.6569 18 22 16.6569 22 15L22 13C22 11.8954 21.1046 11 20 11M5 18C3.3431 18 2 16.6569 2 15L2 13C2 11.8954 2.8954 11 4 11M12 5L10 5C6.6863 5 4 7.6863 4 11M12 5L14 5C17.3137 5 20 7.6863 20 11M12 5L12 14M12 14L6.5 14C6.2239 14 6 13.7761 6 13.5L6 13C6 11.8954 5.1046 11 4 11M12 14L17.5 14C17.7761 14 18 13.7761 18 13.5L18 13C18 11.8954 18.8954 11 20 11M19 18L19 19M5 18L5 19" fill="none"/>
    </svg>
  )
}
