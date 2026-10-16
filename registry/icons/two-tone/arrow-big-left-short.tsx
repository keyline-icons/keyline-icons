import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigLeftShort({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5858 10.5858L11.5858 1.5858C11.8717 1.2999 12.2301 1.114 12.6098 1.0384C12.9894 0.9629 13.3918 0.9974 13.7654 1.1522C14.139 1.307 14.4479 1.567 14.663 1.8889C14.878 2.2107 15 2.5956 15 3L15 6L20 6C20.552 6 21.0534 6.2249 21.4142 6.5858C21.7751 6.9466 22 7.448 22 8L22 16C22 16.552 21.7751 17.0534 21.4142 17.4142C21.0534 17.7751 20.552 18 20 18L15 18L15 21C15 21.4044 14.878 21.7893 14.663 22.1111C14.4479 22.433 14.139 22.693 13.7654 22.8478C13.3918 23.0026 12.9894 23.0371 12.6098 22.9616C12.2301 22.886 11.8717 22.7001 11.5858 22.4142L2.5858 13.4142C2.1955 13.0239 2 12.5103 2 12C2 11.4897 2.1955 10.9761 2.5858 10.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.2929 11.2929L12.2929 2.2929C12.5789 2.0069 13.009 1.9213 13.3827 2.0761C13.7564 2.2309 14 2.5955 14 3L14 6C14 6.5523 14.4477 7 15 7L20 7C20.5523 7 21 7.4477 21 8L21 16C21 16.5523 20.5523 17 20 17L15 17C14.4477 17 14 17.4477 14 18L14 21C14 21.4045 13.7564 21.7691 13.3827 21.9239C13.009 22.0787 12.5789 21.9931 12.2929 21.7071L3.2929 12.7071C2.9024 12.3166 2.9024 11.6834 3.2929 11.2929Z"/>
    </svg>
  )
}
