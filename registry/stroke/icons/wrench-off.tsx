import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WrenchOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14.9795 14.9795C11.8047 14.7279 9.2721 12.1953 9.0205 9.0205M15.0079 15.0079C13.7939 15.0826 12.6446 15.598 11.7797 16.463L7.1213 21.1213C6.5587 21.6839 5.7956 22 5 22C3.3431 22 2 20.6569 2 19C2 18.2044 2.3161 17.4413 2.8787 16.8787L7.537 12.2203C8.402 11.3554 8.9174 10.2061 8.9921 8.9921M10.2813 4.6244C11.4659 3.0317 13.3625 2 15.5 2C15.7072 2 15.9143 2.0099 16.1206 2.0297C16.6336 2.0789 17.0251 2.5098 17.0251 3.0251C17.0251 3.2903 16.9198 3.5447 16.7322 3.7322L15.1464 5.318C14.6776 5.7869 14.4142 6.4227 14.4142 7.0858C14.4142 8.4665 15.5335 9.5858 16.9142 9.5858C17.5773 9.5858 18.2131 9.3224 18.682 8.8536L20.2678 7.2678C20.4553 7.0802 20.7097 6.9749 20.9749 6.9749C21.4902 6.9749 21.9211 7.3664 21.9703 7.8794C21.9901 8.0857 22 8.2928 22 8.5C22 10.6375 20.9683 12.5341 19.3756 13.7187M2 2L22 22" fill="none"/>
    </svg>
  )
}
