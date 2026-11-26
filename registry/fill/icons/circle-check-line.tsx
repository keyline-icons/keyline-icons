import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCheckLine({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM9.7071 9.2929C9.3166 8.9024 8.6834 8.9024 8.2929 9.2929C7.9024 9.6834 7.9024 10.3166 8.2929 10.7071L10.2929 12.7071C10.6834 13.0976 11.3166 13.0976 11.7071 12.7071L15.7071 8.7071C16.0976 8.3166 16.0976 7.6834 15.7071 7.2929C15.3166 6.9024 14.6834 6.9024 14.2929 7.2929L11 10.5858ZM9 15C8.4477 15 8 15.4477 8 16C8 16.5523 8.4477 17 9 17L15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
