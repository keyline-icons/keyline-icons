import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleChevronDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1 C18.0751 1 23 5.9249 23 12 C23 18.0751 18.0751 23 12 23 C5.9249 23 1 18.0751 1 12 C1 5.9249 5.9249 1 12 1 ZM7.2929 10.7071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.7071 10.7071C16.8946 10.5196 17 10.2652 17 10C17 9.7348 16.8946 9.4804 16.7071 9.2929C16.3166 8.9024 15.6834 8.9024 15.2929 9.2929L12 12.5858L8.7071 9.2929C8.3166 8.9024 7.6834 8.9024 7.2929 9.2929C6.9024 9.6834 6.9024 10.3166 7.2929 10.7071Z" fill="currentColor"/>
    </svg>
  )
}
