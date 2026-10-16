import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Watch({ size = 24, ...props }: IconProps) {
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
      <path d="M7.0999 5.1382L7.3982 2.7519C7.5233 1.7511 8.3741 1 9.3828 1L14.6172 1C15.6259 1 16.4767 1.7511 16.6018 2.7519L16.9001 5.1382C18.1498 5.5313 19 6.6899 19 8L19 16C19 17.3101 18.1498 18.4687 16.9001 18.8618L16.6018 21.2481C16.4767 22.2489 15.6259 23 14.6172 23L9.3828 23C8.3741 23 7.5233 22.2489 7.3982 21.2481L7.0999 18.8618C5.8502 18.4687 5 17.3101 5 16L5 8C5 6.6899 5.8502 5.5313 7.0999 5.1382ZM9.1328 5L14.8672 5L14.6172 3L9.3828 3L9.1328 5ZM14.8672 19L9.1328 19L9.3828 21L14.6172 21L14.8672 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
