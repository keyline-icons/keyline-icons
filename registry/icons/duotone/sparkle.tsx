import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M12.4651 3.3166L14.5506 8.6043C14.7031 8.9909 15.0091 9.2969 15.3957 9.4494L20.6834 11.5349C20.8745 11.6102 21 11.7947 21 12C21 12.2053 20.8745 12.3898 20.6834 12.4651L15.3957 14.5506C15.0091 14.7031 14.7031 15.0091 14.5506 15.3957L12.4651 20.6834C12.3898 20.8745 12.2053 21 12 21C11.7947 21 11.6102 20.8745 11.5349 20.6834L9.4494 15.3957C9.2969 15.0091 8.9909 14.7031 8.6043 14.5506L3.3166 12.4651C3.1255 12.3898 3 12.2053 3 12C3 11.7947 3.1255 11.6102 3.3166 11.5349L8.6043 9.4494C8.9909 9.2969 9.2969 8.9909 9.4494 8.6043L11.5349 3.3166C11.6102 3.1255 11.7947 3 12 3C12.2053 3 12.3898 3.1255 12.4651 3.3166Z" fill="none"/>
    </svg>
  )
}
