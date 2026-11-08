import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cabin({ size = 24, ...props }: IconProps) {
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
      <path d="M8.998 17.999H4.998M4.998 17.999C3.894 17.999 2.998 18.894 2.998 19.999C2.998 21.103 3.894 21.999 4.998 21.999H18.998C20.103 21.999 20.998 21.103 20.998 19.999C20.998 18.894 20.103 17.999 18.998 17.999M4.998 17.999H8.998M4.998 17.999C3.894 17.999 2.998 17.103 2.998 15.999C2.998 14.894 3.894 13.999 4.998 13.999M18.998 17.999H14.998M18.998 17.999H14.998M18.998 17.999C20.103 17.999 20.998 17.103 20.998 15.999C20.998 14.894 20.103 13.999 18.998 13.999M4.998 13.999H9.173M4.998 13.999H9.173M4.998 13.999C3.894 13.999 2.998 13.103 2.998 11.999V11.899M18.998 13.999H14.824M18.998 13.999H14.824M18.998 13.999C20.103 13.999 20.998 13.103 20.998 11.999V11.899M1.738 13.285L11.998 2L22.258 13.285M3.998 10.799V2.999H7.998V6.399M8.998 21.999V14.999C8.998 13.342 10.341 11.999 11.998 11.999C13.655 11.999 14.998 13.342 14.998 14.999V21.999"/>
    </svg>
  )
}
