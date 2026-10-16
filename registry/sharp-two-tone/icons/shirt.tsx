import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shirt({ size = 24, ...props }: IconProps) {
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
      <path d="M15.3417 1.0602L20.8417 3.0602C21.1286 3.1645 21.3521 3.3942 21.4487 3.6838L22.9487 8.1838C22.9827 8.2857 23.0001 8.3925 23.0001 8.5C23.0001 8.8589 22.8078 9.1902 22.4962 9.3682L19.4751 11.0946L18.9991 22.0434C18.9758 22.5783 18.5354 23 18 23L6 23C5.4646 23 5.0242 22.5783 5.0009 22.0434L4.5249 11.0946L1.5038 9.3682C1.1922 9.1902 0.9999 8.8589 0.9999 8.5C0.9999 8.3925 1.0173 8.2857 1.0513 8.1838L2.5513 3.6838C2.6479 3.3942 2.8714 3.1645 3.1583 3.0602L8.6583 1.0602C8.7678 1.0204 8.8834 1 9 1C9.5523 1 10 1.4477 10 2C10 3.1046 10.8954 4 12 4C13.1046 4 14 3.1046 14 2C14 1.4477 14.4477 1 15 1C15.1166 1 15.2322 1.0204 15.3417 1.0602Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 2L20.5 4L22.0001 8.5L18.5 10.5L18 22L6 22L5.5 10.5L1.9999 8.5L3.5 4L9 2C9 3.6569 10.3431 5 12 5C13.6569 5 15 3.6569 15 2Z"/>
    </svg>
  )
}
