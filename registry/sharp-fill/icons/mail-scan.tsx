import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailScan({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3.8871V3C2 2.4477 2.4477 2 3 2H21C21.5523 2 22 2.4477 22 3V3.8871C22 4.3151 21.7276 4.6957 21.3225 4.8337L12.3139 7.9029L12.1697 7.9651C12.0817 8.0115 11.9183 8.0115 11.8303 7.9651L11.6861 7.9029L2.6775 4.8337C2.2724 4.6957 2 4.3151 2 3.8871ZM2 8.1129C2 7.7903 2.1556 7.4875 2.418 7.2997C2.6803 7.112 3.0171 7.0623 3.3225 7.1663L10.978 9.7746C11.6111 10.0756 12.3889 10.0756 13.022 9.7746L20.6775 7.1663C20.9829 7.0623 21.3197 7.112 21.582 7.2997C21.8444 7.4875 22 7.7903 22 8.1129V12H23V14H1V12H2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 17H11M22 17H13M21 21H17M15 21H9M7 21H3"/>
    </svg>
  )
}
