import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigUpShort({ size = 24, ...props }: IconProps) {
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
      <path d="M13.4142 2.5858L22.4142 11.5858C22.7001 11.8717 22.886 12.2301 22.9616 12.6098C23.0371 12.9894 23.0026 13.3918 22.8478 13.7654C22.693 14.139 22.433 14.4479 22.1111 14.663C21.7893 14.878 21.4044 15 21 15L18 15L18 20C18 20.552 17.7751 21.0534 17.4142 21.4142C17.0534 21.7751 16.552 22 16 22L8 22C7.448 22 6.9466 21.7751 6.5858 21.4142C6.2249 21.0534 6 20.552 6 20L6 15L3 15C2.5956 15 2.2107 14.878 1.8889 14.663C1.567 14.4479 1.307 14.139 1.1522 13.7654C0.9974 13.3918 0.9629 12.9894 1.0384 12.6098C1.114 12.2301 1.2999 11.8717 1.5858 11.5858L10.5858 2.5858C10.9761 2.1955 11.4897 2 12 2C12.5103 2 13.0239 2.1955 13.4142 2.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12.7071 3.2929L21.7071 12.2929C21.9931 12.5789 22.0787 13.009 21.9239 13.3827C21.7691 13.7564 21.4045 14 21 14L18 14C17.4477 14 17 14.4477 17 15L17 20C17 20.5523 16.5523 21 16 21L8 21C7.4477 21 7 20.5523 7 20L7 15C7 14.4477 6.5523 14 6 14L3 14C2.5955 14 2.2309 13.7564 2.0761 13.3827C1.9213 13.009 2.0069 12.5789 2.2929 12.2929L11.2929 3.2929C11.6834 2.9024 12.3166 2.9024 12.7071 3.2929Z"/>
    </svg>
  )
}
