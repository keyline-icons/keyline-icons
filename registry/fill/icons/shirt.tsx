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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15.3417 1.0602L19.9907 2.7508C20.8021 3.0458 21.447 3.6761 21.7606 4.4804L22.8633 7.3088C22.9535 7.5404 22.9998 7.7867 22.9998 8.0352C22.9998 8.7742 22.5924 9.453 21.9402 9.8004L19.4742 11.114L19.0822 20.1303C19.0125 21.735 17.6912 23 16.0851 23L7.9149 23C6.3088 23 4.9875 21.735 4.9178 20.1303L4.5258 11.114L2.0598 9.8004C1.4076 9.453 1.0002 8.7742 1.0002 8.0352C1.0002 7.7867 1.0465 7.5404 1.1367 7.3088L2.2394 4.4804C2.553 3.6761 3.1979 3.0458 4.0093 2.7508L8.6583 1.0602C8.7678 1.0204 8.8834 1 9 1C9.5523 1 10 1.4477 10 2C10 3.1046 10.8954 4 12 4C13.1046 4 14 3.1046 14 2C14 1.4477 14.4477 1 15 1C15.1166 1 15.2322 1.0204 15.3417 1.0602Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
