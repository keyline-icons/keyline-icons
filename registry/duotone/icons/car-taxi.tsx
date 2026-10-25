import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarTaxi({ size = 24, ...props }: IconProps) {
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
      <path d="M1 18L1 15.6491C1 15.1117 1.0866 14.5778 1.2566 14.068L3.2621 8.0513C3.6705 6.8263 4.8169 6 6.1082 6L12.0975 6C12.9582 6 13.7775 6.3697 14.347 7.0151L18.5717 11.8031L20.9487 12.5955C22.1737 13.0038 23 14.1502 23 15.4415L23 18C23 19.1046 22.1046 20 21 20L3 20C1.8954 20 1 19.1046 1 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.3874 11L8 11L8 8L6.1082 8C5.6778 8 5.2956 8.2754 5.1595 8.6838L4.3874 11ZM10 10C10 10.5523 10.4477 11 11 11L15.2328 11L12.8844 8.3384C12.6945 8.1232 12.4214 8 12.1345 8L10 8L10 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 19C8 20.1046 7.1046 21 6 21C4.8954 21 4 20.1046 4 19C4 17.8954 4.8954 17 6 17C7.1046 17 8 17.8954 8 19ZM19 19C19 20.1046 18.1046 21 17 21C15.8954 21 15 20.1046 15 19C15 17.8954 15.8954 17 17 17C18.1046 17 19 17.8954 19 19ZM7.5 3L10.5 3" fill="none"/>
    </svg>
  )
}
