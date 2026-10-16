import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HousePlus({ size = 24, ...props }: IconProps) {
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
      <path d="M11.9998 2.9963C12.552 2.99646 12.9998 3.44411 12.9998 3.9963V8.00021C12.9999 9.657 14.343 11.0002 15.9998 11.0002H19.9998C20.552 11.0003 20.9997 11.4481 20.9998 12.0002V20.0002C20.9996 21.6568 19.6565 23.0001 17.9998 23.0002H15.9998V19.0002C15.9998 16.7911 14.2089 15.0002 11.9998 15.0002C9.79074 15.0002 7.99983 16.7911 7.99983 19.0002V23.0002H5.99983C4.34311 23.0002 3.00008 21.6569 2.99983 20.0002V12.3108L2.64632 12.6106C2.22498 12.9674 1.59414 12.9146 1.23714 12.4934C0.880186 12.072 0.931985 11.4412 1.35335 11.0842L10.0604 3.70724C10.6197 3.23344 11.3109 2.9963 11.9998 2.9963Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 2L19 8M16 5L22 5"/>
    </svg>
  )
}
