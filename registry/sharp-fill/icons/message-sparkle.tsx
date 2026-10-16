import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7234 19.8057L5.4389 21.8985C4.8104 22.2055 4.0689 21.7889 4.0043 21.0924L3.6081 16.825C1.9807 15.2413 1 13.081 1 11C1 6.1011 6.1264 2 12 2C17.8736 2 23 6.1011 23 11C23 15.8989 17.8736 20 12 20C11.2503 20 10.4661 19.9328 9.7234 19.8057ZM12.8735 6.5225C12.697 6.2057 12.3627 6.0093 12 6.0093C11.6373 6.0093 11.303 6.2057 11.1265 6.5225L9.8369 8.8369L7.5225 10.1265C7.2057 10.303 7.0093 10.6373 7.0093 11C7.0093 11.3627 7.2057 11.697 7.5225 11.8735L9.8369 13.1631L11.1265 15.4775C11.303 15.7943 11.6373 15.9907 12 15.9907C12.3627 15.9907 12.697 15.7943 12.8735 15.4775L14.1631 13.1631L16.4775 11.8735C16.7943 11.697 16.9907 11.3627 16.9907 11C16.9907 10.6373 16.7943 10.303 16.4775 10.1265L14.1631 8.8369L12.8735 6.5225Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
