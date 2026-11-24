import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBeer({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L10 14M4 2L8 2L8 7C8 8 10 9 10 11L10 22L2 22L2 11C2 9 4 8 4 7ZM21.0005 6L21.4847 7.4541C21.826 8.478 22 9.5502 22 10.6295L22 10.7639C22 12.2344 21.6576 13.6847 21 15L20 17L20 17.7929C20 18.2456 20.1799 18.6799 20.5 19C20.8201 19.3201 21 19.7544 21 20.2071L21 22L15 22L15 20.2071C15 19.7544 15.1799 19.3201 15.5 19C15.8201 18.6799 16 18.2456 16 17.7929L16 17L15 15C14.3424 13.6847 14 12.2344 14 10.7639L14 10.6295C14 9.5502 14.174 8.478 14.5153 7.4541L14.9995 6Z" fill="none"/>
    </svg>
  )
}
