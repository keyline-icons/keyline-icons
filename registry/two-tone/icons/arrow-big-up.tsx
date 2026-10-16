import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigUp({ size = 24, ...props }: IconProps) {
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
      <path d="M13.4142 1.5858L20.4142 8.5858C20.7001 8.8717 20.886 9.2301 20.9616 9.6098C21.0371 9.9894 21.0026 10.3918 20.8478 10.7654C20.693 11.139 20.433 11.4479 20.1111 11.663C19.7893 11.878 19.4044 12 19 12L17 12L17 21C17 21.552 16.7751 22.0534 16.4142 22.4142C16.0534 22.7751 15.552 23 15 23L9 23C8.448 23 7.9466 22.7751 7.5858 22.4142C7.2249 22.0534 7 21.552 7 21L7 12L5 12C4.5956 12 4.2107 11.878 3.8889 11.663C3.567 11.4479 3.307 11.139 3.1522 10.7654C2.9974 10.3918 2.9629 9.9894 3.0384 9.6098C3.114 9.2301 3.2999 8.8717 3.5858 8.5858L10.5858 1.5858C10.9761 1.1955 11.4897 1 12 1C12.5103 1 13.0239 1.1955 13.4142 1.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12.7071 2.2929L19.7071 9.2929C19.9931 9.5789 20.0787 10.009 19.9239 10.3827C19.7691 10.7564 19.4045 11 19 11L17 11C16.4477 11 16 11.4477 16 12L16 21C16 21.5523 15.5523 22 15 22L9 22C8.4477 22 8 21.5523 8 21L8 12C8 11.4477 7.5523 11 7 11L5 11C4.5955 11 4.2309 10.7564 4.0761 10.3827C3.9213 10.009 4.0069 9.5789 4.2929 9.2929L11.2929 2.2929C11.6834 1.9024 12.3166 1.9024 12.7071 2.2929Z"/>
    </svg>
  )
}
