import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareCode({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 14C22 16.2091 20.2091 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2ZM10.7071 8.2071C11.0976 7.8166 11.0976 7.1834 10.7071 6.7929C10.3166 6.4024 9.6834 6.4024 9.2929 6.7929L6.7929 9.2929C6.4024 9.6834 6.4024 10.3166 6.7929 10.7071L9.2929 13.2071C9.6834 13.5976 10.3166 13.5976 10.7071 13.2071C11.0976 12.8166 11.0976 12.1834 10.7071 11.7929L8.9142 10ZM14.7071 6.7929C14.3166 6.4024 13.6834 6.4024 13.2929 6.7929C12.9024 7.1834 12.9024 7.8166 13.2929 8.2071L15.0858 10L13.2929 11.7929C12.9024 12.1834 12.9024 12.8166 13.2929 13.2071C13.6834 13.5976 14.3166 13.5976 14.7071 13.2071L17.2071 10.7071C17.5976 10.3166 17.5976 9.6834 17.2071 9.2929Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
